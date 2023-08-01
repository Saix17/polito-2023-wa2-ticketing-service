import { useState } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Profile } from "./Profile";
import { useNavigate, NavLink } from "react-router-dom";

function GetProfileForm(props) {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.readProfileByMail(email);
        props.setEdit(true);
      }

    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Control type='email' value={email} required={true} placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
            </Form.Group>
            <div align='right'>
                <Button type='submit' variant='dark'>Get</Button>
            </div>
        </Form>
    </>
}

function GetProductForm(props){
    const [id, setId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.readProductByID(id);
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Control type='text' value={id} required={true} placeholder="Id" onChange={(event) => { setId(event.target.value) }} />
            </Form.Group>
            <div align='right'>
                <Button type='submit' variant='dark'>Get</Button>
            </div>
        </Form>
    </>
}
function EditProfileForm(props) {
    let navigate = useNavigate();
    const [name, setName] = useState(props.profile.name);
    const [surname, setSurname] = useState(props.profile.surname);


    const handleSubmit = (event) => {
        event.preventDefault();
        props.editProfile(new Profile(props.profile.email, name, surname));
        props.setEdit(false);
        navigate('/profiles');
    }

    return <>
        <div style={{ padding: 10}} class="FontText" >
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} required={true} placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type='text' value={surname} required={true} placeholder="Surname" onChange={(event) => { setSurname(event.target.value) }} />
                </Form.Group>
                <div align='right'>
                    <NavLink to='/profiles'><Button variant='secondary' onClick={() => props.setEdit(false)}>Cancel</Button></NavLink> &nbsp;
                    <Button type='submit' variant='dark'>Save</Button>
                </div>
            </Form>
        </div>
    </>

}


function AddProfileForm(props) {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addProfile(new Profile(email, name, surname));

        setEmail('');
        setName('');
        setSurname('');
        navigate('/profiles');

    }

    return <>
        <div style={{ padding: 10 }} class="FontText">
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={email} required={true} placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} required={true} placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type='text' value={surname} required={true} placeholder="Surname" onChange={(event) => { setSurname(event.target.value) }} />
                </Form.Group>
                <div align='right'>
                    <NavLink to='/profiles'><Button variant='secondary'>Cancel</Button></NavLink> &nbsp;
                    <Button type='submit' variant='dark'>Add</Button>
                </div>
            </Form></div>
    </>

}

function AddTicketForm(props) {
    let navigate = useNavigate();
    const [object, setObject] = useState('');
    const [argument, setArgument] = useState('');
    const [productEan, setProductEan] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addTicket()//new Ticket(email, name, surname));

        setObject('');
        setArgument('');
        setProductEan('');
        navigate('/tickets');

    }

    return <>
        <div style={{ padding: 10 }} class="FontText">
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>object</Form.Label>
                    <Form.Control type='text' value={object} required={true} placeholder="Object" onChange={(event) => { setObject(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Argument</Form.Label>
                    <Form.Control type='text' value={argument} required={true} placeholder="Argument" onChange={(event) => { setArgument(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>ProductEan</Form.Label>
                    <Form.Control type='text' value={productEan} required={true} placeholder="ProductEan" onChange={(event) => { setProductEan(event.target.value) }} />
                </Form.Group>
                <div align='right'>
                    <NavLink to='/tickets'><Button variant='secondary'>Cancel</Button></NavLink> &nbsp;
                    <Button type='submit' variant='dark'>Add</Button>
                </div>
            </Form></div>
    </>

}

// NUOVO
function AddExpertForm(props) {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [selected, setSelected] = useState([]);

    const expertises = ['exp1', 'exp2', 'exp3', 'exp4']

    // Adds expertises or delete according to checkboxes
    const handleCheckboxChange = (value) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((val) => val !== value));
        } else {
            setSelected([...selected, value]);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addExpert()

        navigate('/manager');
    }

    return <>
        <div style={{ padding: 10 }} class="FontText">
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} required={true} placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type='text' value={surname} required={true} placeholder="Surname" onChange={(event) => { setSurname(event.target.value) }} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Expertises:</Form.Label>
                    {expertises.map((value) => (
                        <div key={value}>
                            <Form.Check
                                type="checkbox"
                                label={value}
                                checked={expertises.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                            />
                        </div>
                    ))}
                </Form.Group>
                <div align='right'>
                    <NavLink to='/manager'><Button variant='secondary'>Cancel</Button></NavLink> &nbsp;
                    <Button type='submit' variant='dark'>Add</Button>
                </div>
            </Form>
        </div>
    </>
}


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };
  
      props.login(credentials);
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <div className="d-grid gap-4">
          <h1>Login</h1>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
          </Form.Group>
  
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
          </Form.Group>
  
          <Button type="submit">Login</Button>
  
        </div>
  
      </Form>
    )
  };
  
function LogoutButton(props) {
    return (
      <Row>
        <Col>
        <Button variant="outline-light" onClick={props.logout}>Logout</Button>
        </Col>
      </Row>
    )
}

export {
    AddProfileForm,
    EditProfileForm,
    GetProfileForm,
    GetProductForm,
    AddTicketForm,
    AddExpertForm,
    LoginForm,
    LogoutButton};