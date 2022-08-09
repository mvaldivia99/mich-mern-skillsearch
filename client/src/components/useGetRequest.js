import { useEffect, useState } from "react";

const useGetRequest = (path) => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const abortController = new AbortController(); // KEEP THIS IN THE USEEFFECT 
        fetch(path, {signal: abortController.signal})
        .then(body => {
            if (!body.ok){ 
                throw Error('Cannot get data from API - Request failure');
            }
            
            return body.json();
        })
        .then(list => {
            setData(list);
            setIsLoading(false);
            setErrorMessage("");
        }) 
        .catch(e => {

            if (e.name !== 'AbortError')
            {
                setErrorMessage(e.message);
                setData([]);
                setIsLoading(false);
            }
        })

        
        return () => abortController.abort();
        
    }, [path]);  


    return { data, isLoading, errorMessage };
}

export default useGetRequest;