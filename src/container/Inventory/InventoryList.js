import React, {Component } from 'react';
import { connect } from 'react-redux';
import {getInventoryData} from '../../redux/action/InventoryAction';
import Table from '../../component/UI/Table/Table';
import Button from '../../component/UI/Button/Button';
import classes from './InventoryList.module.css';
import { INVENTORY_LIST_COLUMNS } from '../../component/UI/Table/Utils';
import InventoryFilter from "./InventoryFilter";
import {ToastsContainer, ToastsStore} from "react-toasts";
import {DATA_NOT_FOUND} from "../../common/Utils";

function mapDispatchToProps(dispatch) {
    return {
        getInventoryData: (params)=> dispatch(getInventoryData(params)),
    };
}

class ConnectedInventoryList extends Component {
    state={
        dataFound:true
    }
    componentDidMount() {
      this.props.getInventoryData().catch(error=> ToastsStore.error(error, 2000));
    }

    addInventoryHandler =()=> {
      this.props.navigate('/inventory/add', {replace:true});
    }

    searchInventoryHandler = async (params) => {
        await this.props.getInventoryData(params).then(()=>{
            if(this.props.inventoryData.length === 0){
                this.setState({dataFound: false})
                ToastsStore.error(DATA_NOT_FOUND, 2000);
            }else{
                this.setState({ dataFound:true});
            }
        }).catch(error=> ToastsStore.error(error, 2000));
    }

    clearSearchHandler = () => {
        window.location.reload();
    }
   
    render(){
        return (
            <>
                <ToastsContainer position='top_center' store={ToastsStore} />
                <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                  <div className={classes.AddInventory}>
                   <span className={classes.Text}>New Production?</span>
                   <Button btnType='Success' clicked={this.addInventoryHandler}> ADD </Button>
                </div>
                  <div className="mt-4">
                    <InventoryFilter clicked={(params)=>this.searchInventoryHandler(params)} clearClicked={this.clearSearchHandler}/>
                    <Table columns={INVENTORY_LIST_COLUMNS} data={this.props.inventoryData} dataFound={this.state.dataFound}/>
                  </div>
                </main>
                </div>
            </>
          )
    }
}
function mapStateToProps(state) {
    return {
        inventoryData: state.localSales.inventoryData,
    };
}

const InventoryList = connect(
    mapStateToProps,
  mapDispatchToProps
)(ConnectedInventoryList)

export default InventoryList;
