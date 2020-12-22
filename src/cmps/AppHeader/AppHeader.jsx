
import './AppHeader.scss'
import { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { eventBus } from '../../services/eventBusService.js';
import { storageService } from '../../services/storageService';

class _AppHeader extends Component {
    componentDidMount() {
        eventBus.on('details mounted', () => {
            console.log('Details is now mounted');
        })
    }
    toHome = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <section className="app-header flex space-between align-center full">
                <p className="hover-pointer logo" onClick={this.toHome}>mister bitcoin</p>
                <nav className="main-nav flex" >
                    <NavLink to="/signup">{storageService.load('CURR_USER') ? 'logout' : 'signup'}</NavLink>
                    <NavLink to="/contact">Contacts List</NavLink>
                    <NavLink to="/statistic">Statistic charts</NavLink>
                </nav>
            </section>
        )
    }
}
export const AppHeader = withRouter(_AppHeader)

