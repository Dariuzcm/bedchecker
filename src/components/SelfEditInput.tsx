import { ChangeEvent, FunctionComponent, useState } from "react";
import { CloseIcon } from "../icons/Close";
import AcceptIcon from "../icons/AcceptIcon";
import EditIcon from "../icons/Editicon";
import { Button } from "@/shadcdn/ui/button";

type SelfEditInputProps<T> = {
  object: T
  partialEditor: (key: Partial<T>) => void
  ObjKey: keyof T
  defaultText?: string
  classNames?: {
    title: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelfEditInput: FunctionComponent<SelfEditInputProps<any>> = (props) => {
  const { object, partialEditor, ObjKey, classNames, defaultText } = props;
  const [editting, setEditting] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [originalValues, _setOriginalValues] = useState<typeof object>(object);

  const handleOnEdit = () => {
    setEditting(true);
  };

  const resetEdditing = () => {
    setEditting(false);
  };

  const restore = (key: keyof typeof object) => {
    partialEditor({
      [key]: originalValues?.[key]
    })
    resetEdditing()
  }
  const handleOnChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    partialEditor({
      [name]: value,
    });
  };

  return (
    <div className="w-full px-5">
      <div className="relative p-0">
        {defaultText && <h4 className="font-semibold">{defaultText}</h4>}
      </div>
      <div className="flex justify-between contents-center items-center gap-3 w-full pl-3 pr-0">
        {editting ? (
          <>
            <input
              name={ObjKey as string}
              onChange={handleOnChangeUser}
              autoFocus
              value={object?.[ObjKey]}
              className="w-full"
            />
            <Button
              onClick={resetEdditing}
              className="text-success"
              variant="ghost"
              size="sm"
            >
              <AcceptIcon />
            </Button>
            <Button
              onClick={() => restore(ObjKey)}
              variant="ghost"
              className="text-danger"
              size="sm"
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            <h2 className={classNames?.title || `text-lg font-semibold text-ellipsis text-nowrap overflow-hidden max-w-[80%]`}>
              {console.log(ObjKey, object, object?.[ObjKey])}
              {object?.[ObjKey]?.toString()?.length > 0 ? ( object?.[ObjKey]): defaultText }
            </h2>
            <Button
              className="text-secondary"
              onClick={() => handleOnEdit()}
            >
              <EditIcon className="size-8" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SelfEditInput;
