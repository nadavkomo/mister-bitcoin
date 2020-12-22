
import { useForm } from '../../services/customHooks'
import './ContactFilter.scss'

export function ContactFilter(props) {
    const [filterBy, setFilterBy] = useForm({term:''}, props.onSetFilter)
    const {term} = filterBy
    return <form className="contact-filter">
        <input name="term" placeholder="Free Search" value={term} type="text" onChange={setFilterBy} />
    </form>

}











// export class ContactFilter extends Component {
//     state = {
//         term: '',
//     }
//     onChangeHandler = (ev) => {
//         const field = ev.target.name
//         const value = ev.target.type === "number" ? +ev.target.value : ev.target.value
//         this.setState({ [field]: value }, () => {
//             this.props.onSetFilter({ ...this.state })
//         })
//     }
//     render() {
//         const { term } = this.state
//         return <form className="contact-filter">
//             <input name="term" placeholder="Free Search" value={ term } type="text" onChange={ this.onChangeHandler } />
//         </form>

//     }
// }

