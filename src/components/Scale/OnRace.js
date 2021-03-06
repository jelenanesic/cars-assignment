import React from 'react';
import './onRace.scss';

class OnRace extends React.Component {
   constructor() {
      super();
      this.state = {
         showRank: false
      }
   };

   checkSpeedIndex = (element) => {
      return element === this.props.speed;
   };

   onRaceEnd = () => { 
      this.setState({ showRank: true })
   };

   render(){
      let calcRaceDuration = this.props.raceDurationInput / this.props.speed;

      let moveCarStyle = {
         position: 'absolute',
         left: '0',
         transform: 'translateX(1000px)',
         transition: 'linear',
         transitionDuration: calcRaceDuration + 's'
      };
   
      let rankStyle = {
         position: 'absolute', 
         left: '940px',
         marginTop: '5px'
      };

      let rankPosition = this.props.sortedSpeed.findIndex(this.checkSpeedIndex) + 1;
      
      let styleSpan;
      switch (rankPosition) {
         case 1:
            //gold
            styleSpan = '#D4AF37';
            break;
         case 2:
            //silver
            styleSpan = '#BCC6CC';
            break;
         case 3:
            //bronze
            styleSpan = '#CD7F32';
            break;
         default:
            break;
      }
   
      return (
         <tr className="OnRace">
            { 
               this.state.showRank ? 
               <th style={rankStyle}>
                  <span className="rankSpan" style={{backgroundColor: styleSpan}}>
                    {rankPosition}
                  </span>
               </th> 
               : null 
            }
            <th onTransitionEnd={this.onRaceEnd} scope="row" style={this.props.moveCars ? moveCarStyle : {}}>
               <img src={this.props.image} />
            </th>
         </tr>
      );
   }
}

export default OnRace;