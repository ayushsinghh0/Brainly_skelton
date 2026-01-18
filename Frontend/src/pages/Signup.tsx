import { Input } from "../components/inputComponent";
import { Button } from "../components/ui/Button";

export function Signup(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-white rounded border min-w-48">
                    <Input placeholder="Username"></Input>
                    <Input placeholder="Password"></Input>

                    <Button variant="primary" text="sign up"/>
                </div>

    </div>
}