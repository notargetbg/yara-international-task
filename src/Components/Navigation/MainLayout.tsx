import { ReactElement, ReactPortal } from 'react';
import { MainNav } from './MainNav';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNodeArray = Array<ReactNode>
type ReactFragment = ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
    children: ReactNode;
}

const MainLayout = ({ children }: Props): React.JSX.Element => {
    return (
        <>
            <MainNav />
            {children}
        </>

    );
};

export default MainLayout;