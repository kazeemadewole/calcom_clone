export * from "./Alert";
// import { Dialog, DialogContent } from "@calcom/ui/Dialog";
// import classNames from "classnames";
// import React from "react";

// interface Props extends React.PropsWithChildren<any> {
//   wide?: boolean;
//   scroll?: boolean;
//   noPadding?: boolean;
//   isOpen: boolean;
//   onExit: () => void;
// }

// export default function ModalContainer(props: Props) {
//   return (
//     <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//       <Dialog open={props.isOpen} onOpenChange={props.onExit}>
//         <DialogContent>
//           <div
//             className={classNames(
//               "inline-block transform bg-white text-left align-bottom transition-all sm:align-middle",
//               {
//                 "sm:w-full sm:max-w-lg ": !props.wide,
//                 "sm:w-4xl sm:max-w-4xl": props.wide,
//                 "overflow-scroll": props.scroll,
//                 "!p-0": props.noPadding,
//               }
//             )}>
//             {props.children}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
