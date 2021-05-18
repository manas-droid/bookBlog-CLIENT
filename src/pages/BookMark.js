import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_YOUR_BOOKMARKS } from "../utils/GraphQl";
import PostComponent from '../components/PostComponent';
function BookMark(props){
    const result = useQuery(GET_YOUR_BOOKMARKS);

    if(result.loading){
        return <div>
            loading ...
            </div>
    }

    const bookmarks = (result.data) ? result.data.getYourBookMarks : undefined;

    if(bookmarks.length === 0) 
        return <div> You have no bookmarks ;( </div>


    return(
        <div className="ui container text">
                {
                    bookmarks.map(b=>{
                        return <PostComponent key={b.id}  {...b} {...props}/>
                    })
                }
        </div>
);
}

export default BookMark;