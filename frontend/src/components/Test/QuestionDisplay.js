import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios'


const QuestionDisplay = ({question}) => {
    const HOST = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_TEST_URL;
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)

    const apiClient = axios.create({
        baseURL: HOST,
    })



    useEffect(() => {
        const fetchDesc = async() => {
            setLoading(true);
            const res = await apiClient.get(`${HOST}/${question.description}`, {responseType: "blob"})
            const desc = await res.data.text();

            setDescription(desc);
            setLoading(false);
        }

        fetchDesc();
    }, [question])

  return (
        !loading && 
            <div className="p-4">
                
                <div>
                <ReactMarkdown>{description}</ReactMarkdown>
                </div>
            </div>
        
    
    )

}

export default QuestionDisplay