import { ReactNode} from "react";

export const Card: React.FC<{children?: ReactNode, className?: string}> = (props) => {
    return (
      <div className={"p-2 rounded-lg shadow-sm shadow-slate-500 relative overflow-clip "+props.className}>
        {props.children}
      </div>
    );
  };
  export default Card;