import { useRef } from "react";
import { Input } from "../components/inputComponent";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef=useRef<HTMLInputElement>(null);
    const PasswordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
  function signup() {
    const username=usernameRef.current?.value;
    const password=PasswordRef.current?.value;
    axios.post(BACKEND_URL+"/user/signUp",{
        
            username,
            password
    })
    alert(
        "you have signed in"
    )
    navigate("/signin")

  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
        <Input ref = {usernameRef}placeholder="Username"></Input>
        <Input ref={PasswordRef} placeholder="Password"></Input>
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            variant="primary"
            size="md"
            text="sign up"
            Loading={false}
            FullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
