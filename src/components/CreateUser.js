import SockJsClient from 'react-stomp';
const React = require('react');
const ReactDOM = require('react-dom')

export default class CreateUser extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onCreate(user) {
		// fetch('http://localhost:8080/api/users', {
		fetch('http://192.168.1.160:8080/api/users', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    firstName: user['firstName'],
				account: user['account'],
			  balance: -1,
		  })
		})
	  // this.clientRef.sendMessage('http://localhost:8080/api/users',
		// 	JSON.stringify({
		// 	    firstName: user['firstName'],
		// 			account: user['account'],
		// 		  balance: -1,
		// 	  })
		// );
	}

	handleSubmit(e) {
		e.preventDefault();
		var newUser = {};
		this.props.attributes.forEach(attribute => {
			console.log(attribute);
			newUser[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.onCreate(newUser);
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
		});
		window.location = "#";
	}

  render() {
  	var inputs = this.props.attributes.map(attribute =>
  			<p key={attribute}>
  				<input type="text" placeholder={attribute} ref={attribute} className="field" />
  			</p>
  	);

  	return (
  		<div>
  			<div id="createUser" className="modalDialog">
  				<div>
  					<h2>Join the game</h2>

  					<form>
  						{inputs}
  						<button onClick={this.handleSubmit}>Create</button>
  					</form>
  				</div>
  			</div>
				<div>
	        <SockJsClient url='http://localhost:8080/handler'
							topics={['/topic/newUser']}
  						onConnect={console.log("Connection established to newUser")}
	            onMessage={(msg) => { console.log(msg); }}
	            ref={ (client) => { this.clientRef = client }} />
	      </div>
				<div>
					<SockJsClient url='http://localhost:8080/handler'
							topics={['/topic/timer']}
  						onConnect={console.log("Connection established to timer")}
							onMessage={(msg) => { console.log(msg); }}
							ref={ (client) => { this.clientRef = client }} />
				</div>
		</div>
  	)
  }
}
