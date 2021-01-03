import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import { fetchData } from '../actions/index';
import 'react-input-range/lib/css/index.css';
class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      price: { min: 0, max: 1 },
    }
  }
  componentDidMount() {
    let self = this;
    self.props.fetchData();
  }
  componentWillReceiveProps(nextProps) {
    var self = this;
    if (nextProps.formData !== self.props.formData) {
      let formData = nextProps.formData && nextProps.formData.Items;
      let count = nextProps.formData && nextProps.formData.count;
      self.setState({ formData, count });
    }
  }
  edit(e, item) {
    window.location.assign('/details?id=' + item.id);
  }
  apply(e) {
    let self = this;
    console.log('apply', this.state);
    let make = (this.state.BMW || this.state.Opel) ? 'make=' + (this.state.BMW ? "BMS" : "") + (this.state.Opel ? (this.state.BMW ? ";" : "") + "Opel" : "") : null;
    let priceStr = 'pricemin=' + this.state.price.min + '&pricemax=' + this.state.price.max;
    let querySting = '?' + (make ? make + "&" : '') + priceStr;
    self.props.fetchData(querySting);
  }
  clear(e) {
    let self = this;
    this.setState({ price: { min: 0, max: 1 }, BMW: false, Opel: false });
    self.props.fetchData();
  }
  handleChange(e) {
    let self = this;
    const name = e.target.name;
    let value = e.target.value;
    if (e.target.type == 'checkbox') {
      value = e.target.checked;
    }
    self.setState({ [name]: value });
  }
  handleSort(e) {
    let self =this;
    const value = e.target.value;
    let formData = [ ...self.state.formData];
    formData = formData.sort((a, b) => {
      if(e.target.value == 'asc'){
       return a.pricing.price - b.pricing.price
      }else{
        return b.pricing.price - a.pricing.price
      }
      
    });
    this.setState({formData});
  }
  render() {
    let self = this;
    const { formData, count } = this.state;
    return (
      <div className='row'>
        <div className='col-2 side_nav'>
          <div className="row">
            <h4 className='pl-2 mt-3'>FILTERS</h4>
            <div className='col-12 mt-3'>
              <p>Maker</p>
              <ul className='list-group'>
                <li className='list-group-item'><input type='checkbox' name='BMW' checked={self.state.BMW} onChange={e => self.handleChange(e)} /><span className='pl-3'>BMW</span></li>
                <li className='list-group-item'><input type='checkbox' name='Opel' checked={self.state.Opel} onChange={e => self.handleChange(e)} /><span className='pl-3'>Opel</span></li>
              </ul>
            </div>
            <div className='col-12 mt-3'>
              <hr />
              <p>Price</p>
              <div className='mt-4'>
                <InputRange
                  maxValue={1000}
                  minValue={100}
                  step={20}
                  value={this.state.price}
                  onChange={value => this.setState({ price: value })} />
              </div>
            </div>
            <div className='col-12 text-right mt-5'>
              <button className="btn btn-secondary btn-sm" onClick={e => self.clear(e)}>Clear</button>
              <button className="btn btn-primary btn-sm ml-3" onClick={e => self.apply(e)}>Apply</button>
            </div>
          </div>
        </div>
        <div className='col-10'>
          <div className='row mt-3'>
            <div className='col-6'>
              <h6>Total : {count}</h6>
            </div>
            <div className='col-5 text-right'>
              <label className='pr-3'>Price</label>
              <select  name='sort' onChange={e => self.handleSort(e)}>
                <option value='asc'>Low to High</option>
                <option value='des'>High to Low</option>
              </select>
            </div>
          </div>
          <div className='row grid_data'>
            {formData && formData.length > 0 ? formData.map(function (elm, i) {
              let obj = elm.teaser || {}
              return (
                <div className='col-md-4 col-sm-4' key={i}>
                  <div className='card' onClick={e => self.edit(e, elm)}>
                    <img src={obj.teaserImage} />
                    <h6><span className='left'>{obj.title}</span><span className='right'>{elm.pricing && elm.pricing.price} $</span></h6>
                  </div>
                </div>
              )
            })
              : null}
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);