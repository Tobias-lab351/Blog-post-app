import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";


export default function Submitbutton() {

    const {pending} = useFormStatus()
  return (
    <div>
          <Button className="w-fit" type="submit" disabled={pending}>{ pending?"Submitting":"Submit"}</Button>
    </div>
  )
}
