import { useRef } from "react";
import { Input } from "./inputComponent";
import { Button } from "./ui/Button";
import { CrossIcon } from "./ui/CrossIcon";

enum ContentType {
  Youtube="youtube",
  twitter= "twitter"
}



export function CreateContentModal({open ,onClose} : CreateContentModalProps){
  const titleRef=useRef<HTMLInputElement>(null);
  const linkRef=useRef<HTMLInputElement>(null);

  function addContent(){
    const title= titleRef.current?.value;
    const link = linkRef.current?.value;

    const [type,setType]=useState(ContentType.Youtube)

  }

    return <div>
        {open && <div className="w-screen h-screen bg-purple-200 fixed top-0 left-0 opacity-90 flex justify-center">
           <div className="flex flex-col justify-center border ">
            <span className="bg-white opacity-100 p-4 rounded border">
              <div className="flex justfy-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon/>

                </div>
              </div>
              <div >
                <Input ref={titleRef} placeholder="Title"></Input>
                 <Input ref={linkRef} placeholder="Link"/>
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" size="md" text="Submit"></Button>
               </div>
            </span>
          </div>
        </div>}
    </div>
}