
import React from 'react';


function SummaryAndTitle({bookname , summary , image}){
  return (
    <div className="subFlex1">
      <div className="bookname">
        <h3>
          {bookname}
        </h3>
      </div>
      {/* <img src= {image} alt={ bookname }/> */}
      <div className="summary">
            <p>
              { summary}
           </p>
      </div>
    </div>
  )
};






export default SummaryAndTitle;
