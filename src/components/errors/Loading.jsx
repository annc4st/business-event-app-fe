import React from "react";
import "./errors.css";

export default function Loading() {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="ev-notf fouro-four-title">
            <h1>Wait</h1>
          </div>         
            <div className="ev-notf">
              <p>...Page is loading!</p>
            </div>

            {/* <div className="ev">
            <img src="https://images.unsplash.com/photo-1594649537448-8133756764c0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D" />
            </div> */}
            
          </div>
        
      </section>
    </>
  );
}
