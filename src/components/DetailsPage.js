import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function location(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

class DetailsPage extends Component {
    constructor(props) {
        super();
        this.state = {
        }


    }
    componentDidMount() {
        let self = this;
        let urlParams = '/' + location("id");
        self.props.fetchData(urlParams);
    }
    componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.formData !== self.props.formData) {
            let formData = nextProps.formData && nextProps.formData.Item;
            self.setState({ formData })

        }
    }
    handleChange(e) {
        let self = this;
        const name = e.target.name;
        const value = e.target.value;
        let formData = { ...self.state.formData };
        formData[name] = value;
        self.setState({ formData });
    }
    render() {
        const { formData } = this.state;
        console.log('formData', formData)
        let images = formData && formData.images || [];
        let car = formData && formData.car || {};
        let pricing = formData && formData.pricing || {};
        let conditions = formData && formData.conditions || {};
        return (
            <div className='row details'>
                <div className='col-12 text-right'>
                    <button className='btn btn-primary btn-sm' onClick={e => window.location.assign('/')}>Back</button>
                </div>

                <div className='col-12 mt-3'>
                    <div className='row'>
                        <div className='col-6'>
                            {images && images.length > 0 && <Slide scale={10}>
                                {images && images.length > 0 ? images.map(function (elm, i) {
                                    return (
                                        <div key={i} className="each-slide">
                                            <div style={{ 'background': `url(${elm.src})` }}>
                                            </div>
                                        </div>
                                    )
                                })
                                    : null}
                            </Slide>}
                        </div>
                        <div className='col-6'>
                            <table className='table table-bordered table-striped'>
                                <tbody>
                                    <tr>
                                        <th>Model</th>

                                        <td>{car.model}</td>
                                    </tr>
                                    <tr>
                                        <th>Make</th>

                                        <td>{car.make}</td>
                                    </tr>
                                    <tr>
                                        <th>Fuel Type</th>

                                        <td>{car.fueltype}</td>
                                    </tr>
                                    <tr>
                                        <th>Version</th>

                                        <td>{car.version}</td>
                                    </tr>
                                    <tr>
                                        <th>Gearing Type</th>

                                        <td>{car.gearingType}</td>
                                    </tr>
                                    <tr>
                                        <th>Features</th>

                                        <td> {car.equipmentDetails && car.equipmentDetails.length > 0 ? car.equipmentDetails.map(function (elm, i) {
                                            return (
                                                <span key={i}>{elm.name}, </span>
                                            )
                                        })
                                            : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <h5>Price Details</h5>
                    <table className='table table-bordered table-striped'>
                        <tbody>
                            <tr>
                                <th>Price</th>

                                <td>{pricing.price}</td>
                            </tr>
                            <tr>
                                <th>Starting Fee</th>

                                <td>{pricing.startingFee}</td>
                            </tr>
                            <tr>
                                <th>Fully Comprehensive</th>
                                <td>{pricing.deductibleFullyComprehensive}</td>
                            </tr>

                            <tr>
                                <th>Partial Cover</th>
                                <td>{pricing.deductiblePartialCover}</td>
                            </tr>
                            <tr>
                                <th>Excess Kilometers</th>
                                <td>{pricing.excessKilometers}</td>
                            </tr>
                            <tr>
                                <th>Annual Kilometers</th>
                                <td>{pricing.includedAnnualKilometers}</td>
                            </tr>
                            <tr>
                                <th>Monthly Excess Kilometers</th>
                                <td>{pricing.monthlyExcessKilometers}</td>
                            </tr>
                            <tr>
                                <th>Booking Options</th>
                                <td>{pricing.bookableOptions && pricing.bookableOptions.length > 0 ? pricing.bookableOptions.map(function (elm, i) {
                                    return (
                                        <span key={i}>{elm.name} (Price- {elm.price}), </span>
                                    )
                                })
                                    : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-6'>
                    <h5>Condition</h5>
                    <table className='table table-bordered table-striped'>
                        <tbody>
                            <tr>
                                <th>Maximum Age</th>

                                <td>{conditions.maximumAge}</td>
                            </tr>
                            <tr>
                                <th>Minimum Age</th>
                                <td>{conditions.minimumAge}</td>
                            </tr>
                            <tr>
                                <th>License Duration</th>

                                <td>{conditions.minLicenseDuration}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}


const mapStateToProps = ({ reducers }) => {
    let toDo = reducers.toDo || {};
    const { formData
    } = toDo;
    return {
        formData
    }
};
const mapDispatchToProps = { fetchData };
export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
