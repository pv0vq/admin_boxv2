import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import fetcher from "../../../api/fetcher";
import API_COMMON from "../../../api/code/common";
interface IProps {
  defaultValue?: string;
  type?: string;
  setValue?: (content: string) => void;
  disable?: boolean;
}

const QuillEditer = ({
  defaultValue = "",
  type = "",
  setValue,
  disable = false,
}: IProps) => {
  const [param, setParam] = useState<string>("");
  let quillRef: any = useRef(null);

  /**
   * 에디터 이미지 핸들러
   *
   */
  const imageHandler = () => {
    // input 태크 생성
    const input: any = document.createElement("input");

    // 속성 설정
    input.setAttribute("type", "file"); //
    input.setAttribute("accept", "image/*");
    // input 실행
    input.click();

    // input onChange 이벤트 실행
    input.addEventListener("change", async () => {
      const file = input.files[0];
      putPreSignUrlHandler(file);
    });
  };

  /**
   * PreSignUrl get 와 put 요청
   *
   * @param file
   */
  const putPreSignUrlHandler = async (file: File) => {
    const params = {
      type: type, // 테이블 명
      fileName: file.name,
    };

    // 서버에 PreSignUrl 발급요청
    await fetcher({
      api: API_COMMON.GET_PRE_SIGNED_URL,
      options: params,
    })
      .then(({ data }) => {
        putAwsImageHandler(data, file);
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  };

  /**
   * S3에 put 요청 (S3이미지 저장)
   *
   * @param url
   * @param file
   */
  const putAwsImageHandler = async (url: string, file: File) => {
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: new Headers({
        "Content-Type": "image/*",
      }),
    })
      .then((res: any) => {
        console.log("res:", res);
        // url 파싱
        const url = new URL(res.url);

        // 에디터 객체
        const editor = quillRef.current.getEditor();
        // 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, "image", url.origin + url.pathname);
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  };

  const changeParamHandler = (content: string) => {
    setParam(content);
    if (setValue) setValue(content);
  };

  // Quill 모듈 설정
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          // 이미지 처리를 이미지 핸들러에 연동
          image: imageHandler,
        },
      },
    };
  }, []);

  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

  return (
    <ReactQuill
      onChange={changeParamHandler}
      defaultValue={defaultValue}
      value={param}
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      readOnly={disable}
    />
  );
};

export default QuillEditer;
