import React from 'react';

import SingleBox from './SingleBox';
import Search from '../Search/Search';

import './carsBoxes.scss';

class CarsBoxes extends React.Component {
   constructor() {
      super();
      this.state = {
         search: '',
         loaderActive: false
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         loaderActive: true
      });
   }

   updateSearch = (e) => {
      this.setState({
         search: e.target.value.substr(0,20)
      });
   }

   render() {
      let filteredCars = this.props.cars.filter(
         (car) => {
            return car.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
         }
      );
      
      return(
         <div className="CarsBoxes">
         { this.state.loaderActive ? 
            <div>
               <Search 
                  search={this.state.search} 
                  updateSearch={this.updateSearch} 
                  placeholder="Search cars by name"
               />
               <div className="row">
               {
                  filteredCars.length === 0 ? 
                  <div className="noResults col-md-12">
                     <h2 className="text-center"> No results found </h2>
                  </div>
                   :
                  filteredCars.map((car, index) => {
                     return <SingleBox 
                              key={car.id} 
                              id={car.id}
                              name={car.name}
                              image={car.image}
                              desc={car.description}
                              speed={car.speed}
                              filteredCars={filteredCars}
                           />
                  })
               }
               </div>
            </div> :
            <div className="alertBox">
               <h2 className="text-center"> loading . . . </h2>
            </div>
         }
         </div>
      );
   }
}

export default CarsBoxes;