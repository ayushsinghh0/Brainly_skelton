import { Input } from "../components/inputComponent";
import { Button } from "../components/ui/Button";

export function Signup(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-white rounded border min-w-48 p-8 rounded-xl">
                    <Input placeholder="Username"></Input>
                    <Input placeholder="Password"></Input>
                    <div className="flex justify-center pt-4">
                      <Button variant="primary"  size="md" text="sign up" Loading={false} FullWidth={true}/>

                    </div>
                </div>

    </div>
}