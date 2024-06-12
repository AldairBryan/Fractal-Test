import { useEffect, useState } from 'react';

const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handler = async () => {
        };
        handler();
    }, []);

    return <>{loading ? null : children}</>;
};

export default MainWrapper;
