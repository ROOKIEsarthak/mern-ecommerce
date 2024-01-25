import React from 'react'
import './DescriptionBox.css'


const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odit culpa. Veritatis reprehenderit, placeat molestiae provident quae odit iusto sint odio optio rerum at explicabo quidem incidunt, non quos consectetur!

            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis veniam est non expedita maxime sunt magnam ullam eveniet ab distinctio dignissimos illum quod exercitationem natus explicabo, cumque eaque ea?
            </p>
        </div>
      
    </div>
  )
}

export default DescriptionBox
