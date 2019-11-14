<label htmlFor="username">Username: </label>
<input 
  type="text"
  name="username"
  value={this.state.username}
  onChange={this.handleChange}
/>

handleSubmit(event) {
  event.preventDefault()
  console.log('sign-up-form, username: ');
  console.log(this.state.username);
}