export function Input({onChange , placeholder}:{onChange:()=>void}){
    return <div>
        <input type={"text"} className="px-4 py-2 border rounded m-2" placeholder={placeholder}></input>
    </div>
}


























/* import type React from "react";

type InputComponentProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputComponent({ onChange, placeholder }: InputComponentProps) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      className="px-4 py-2 rounded m-2 border"
      onChange={onChange}
    />
  );
}
 */