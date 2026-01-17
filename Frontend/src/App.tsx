import "./App.css";
import { CreateContentModal } from "./components/CreateContentModal";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/Share";

function App() {
  return (
    <div className="p-4">
      <CreateContentModal open ={true}/>
      <div className="flex justify-end gap-4">
        <Button
          startIcon={<PlusIcon size="md" />}
          variant="primary"
          text="share"
          size="sm"
        ></Button>
        <Button
          startIcon={<ShareIcon size="md" />}
          variant="secondary"
          text="Add Content"
          size="md"
        ></Button>
        </div>

        <div className="flex gap-4" >
          <Card
            type="twitter"
            link="https://x.com/elonmusk/status/2012259593036964054?s=20"
            title="First tweet"
          ></Card>
          <Card
            type="youtube"
            link="https://youtu.be/gRi82PiiaOs?si=YuDA8t5pSvKI04nG"
            title="First tweet"
          ></Card>
        </div>
      
    </div>
  );
}

export default App;
