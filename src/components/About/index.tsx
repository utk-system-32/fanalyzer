import { type FunctionComponent } from "react";
import Image from "next/image";

interface Props {
  name: string;
  image: HTMLImageElement;
  role: string;
  email: string;
}

const Layout: FunctionComponent<Props> = ({
  name,
  image,
  role,
  email
}) => {
  return (
    <>          
    <main className="container flex justify-center sm:py-16">
        <Image className="flex-col w-1/3 h-1/3 sm:w-60 sm:h-70" src={image} alt={`Picture of ${name}`} width="240" height="240"/>
        <div className="flex-col pl-5 w-1/2 sm:w-1/4">
            <h1 className="text-lg font-bold sm:xl">{name}</h1>
            <div className="text-xs sm:text-base">
                Computer science major at the University of Tennessee, Knoxville<br/><br/>{role}<br/><br/>
                <a href={`mailto:${email}`}>{email}</a>
            </div>
        </div>     
    </main>
    </>
  );
};

export default Layout;
