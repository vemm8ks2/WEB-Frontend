import { ChangeEvent, useState } from "react";
import supabase from "@/lib/supabaseClient";

const Temp = () => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async (file: File) => {
    // 파일 업로드
    const { data, error } = await supabase.storage
      .from("product-image")
      .upload(file.name, file);

    if (error) {
      console.error("File upload error:", error.message);
      throw error;
    }

    console.log("File uploaded successfully:", data);
    return data; // 업로드된 파일 정보 반환
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const fileData = await uploadFile(file);
      console.log(fileData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>파일 업로드 테스트</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Temp;
