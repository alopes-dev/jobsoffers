import React from 'react'
const ACard = (props) =>{
    const {data} = props.config;
    return data.map((i,j)=>{
        const {title,icon,content} = i;
        return (
            <div className="card" style={{background:"#fff!important;"}} key={i+j}>
                <div className="card-header" style={{backgroundColor:" #e2e2e2e2"}} id={`headingOne${i+j}`} data-toggle="collapse" data-target={`#collapseOne${i+j}`} aria-expanded="true" aria-controls={`collapseOne${i+j}`}>
                    <div className="span-icon">
                        <div className={icon}></div>
                    </div>
                    <div className="span-title">
                        {title}
                    </div>
                    <div className="span-mode"></div>
                </div>

                <div id={`collapseOne${i+j}`} className="collapse" aria-labelledby={`headingOne${i+j}`} data-parent="#accordion">
                    <div className="card-body">
                        {content}
                    </div>
                </div>
	        </div>
        )
    })
}
const  Accordion = (props)=> {
    return (
        <div className="accordion mt-4">
            {ACard(props)}
        </div>
    )
}

export default Accordion;