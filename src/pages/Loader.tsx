import { Card } from "@tremor/react";
import { Loader2 } from "lucide-react";
import { FunctionComponent } from "react";

interface LoaderProps {
  
}
 
const Loader: FunctionComponent<LoaderProps> = () => {
  return (<>
  <Card className="bg-white rounded-xl text-center flex gap-3 items-center justify-center h-1/3 font-semibold text-2xl content-center">
      <h1>Loading </h1> <Loader2 className="animate-spin" />
  </Card>
  </>);
}
 
export default Loader;