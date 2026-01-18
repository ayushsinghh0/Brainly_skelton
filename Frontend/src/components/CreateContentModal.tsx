import { Input } from "./inputComponent";
import { Button } from "./ui/Button";
import { CrossIcon } from "./ui/CrossIcon";




export function CreateContentModal({open ,onClose} : CreateContentModalProps){

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
                <Input placeholder="Title"></Input>
                 <Input placeholder="Link"/>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" text="Submit"></Button>
               </div>
            </span>
          </div>
        </div>}
    </div>
}