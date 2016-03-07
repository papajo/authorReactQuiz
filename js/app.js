/** @jsx React.DOM */
(function() { 
	"use strict";

	var Quiz = React.createClass({
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		getIntialState: function() {
			return _.extend({
				bgClass: 'neutral',
				showContinue: false,
			}, this.props.data.selectGame());
		},
		handleBookSelected: function(title) {
			var isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect?'pass':'fail',
				showContinue: isCorrect
			});
		},
		handleContinue: function() {
			this.setState(this.getIntialState());
		},
		handlAddGame: function() {
			routie('add');
		},
		render: function() {
			return (<div> 
				<div className="row">
					<div className="col-md-4">
						<img src={this.state.author.imageUrl} className="authorimage col-md-3" />
					</div>
					<div className="col-md-7">
						{this.state.books.map(function(b) {
							return <Book onBookSelected={this.handleBookSelected} title={b} />
						}, this)}
					</div>
					<div className={"col-md-1 " + this.state.bgClass}></div>
				</div>
				{this.state.showContinue ? (
					<div className="row">
						<div className="col-md-12"
						   	<input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue"/>
			 			</div>
			 		</div>) : <span/>
				}
				<div className="row">
					<div className="col-md-12">
						<input onClick={this.handlAddGame} id="addGameButton" type="button" value="Add Game" class="btn "/>
					</div>
				</div>
	});

	var Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		handleClick: function() {
			this.props.onBookSelected(this.props.title);
		},
		render: function() {
			return <div onClick={this.handleClick} className="answer"> 
				<h4>{this.props.title}</h4>
			</div>
		}

	});

	var AddGameForm = React.createClass({
		propTypes: {
			onGameFormSubmitted: React.PropTypes.func.isRequired
		},
		handleSubmit: function {
			//var data = getRefs(this);	
			this.props.onGameFormSubmitted(getRefs(this));
			return false;
		},
		render: function() {
			return 	<div className="row">
						<div className="col-md-12">
							<h1>Add Game</h1>
							<form role="form" onSubmit={this.handleSubmit>
								<div class="form-group">
									<input ref="imageUrl" type="text" class="form control" placeholder="Image Url" />
								</div>
								<div class="form-group">
									<input ref="answer1" type="text" class="form control" placeholder="Answer 1" />
								</div>
								<div class="form-group">
									<input ref="answer2" type="text" class="form control" placeholder="Answer 2" />
								</div>
								<div class="form-group">
									<input ref="answer3" type="text" class="form control" placeholder="Answer 3" />
								</div>
								<div class="form-group">
									<input ref="answer4" type="text" class="form control" placeholder="Answer 4" />
								</div>
								<button type="submit" class="btn btn-default">Submit</button>
							</form>
						</div>
					</div>;
		}
	});

	var data = [
		{
			name: 'William Shakespeare',
			imageUrl: 'img/img1.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Hamlet','King Lear','Romeo and Juliet']
		},
		{
			name: 'J.K. Rowling',
			imageUrl: 'img/img2.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Daniel Ogren',
			books: ['Harry Potter and the Chamber of Secrets']
		},
		{
			name: 'Mark Twain',
			imageUrl: 'img/img3.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Adventures of Huckleberry Finn']
		},
		{
			name: 'Charles Dickens',
			imageUrl: 'img/img4.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Great Expectations', 'David Copperfield', 'A Tale of Two Cities']
		},
		{
			name: 'Stephen King',
			imageUrl: 'img/img5.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Pinguino',
			books: ['The Pet Cemetary', 'The Shining', 'IT']
		},
		{
			name: 'Joseph Conrad',
			imageUrl: 'img/img6.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Heart of Darkness']
		},

	];
		data.selectGame = function() {
			var books = _.shuffle(this.reduce(function(p, c, i) {
					return p.contact(c.books)
				}, [])).slice(0,4);

			var answer = books[_.random(books.length-1)];

			return {
				books: books,
				author: _.find(this, function(author) {
					return author.books.some(function (title) {
						return title === answer;
					});
				}),
				data.checkAnswer = function(title) {
					return this.author.books.some(function(t) {
						return t === title;
					});
				}
			};
	};
	
	routie({
		'': function() {
			React.renderComponent(<Quiz data={data} />,
						document.getElementById('app'))
		},
		'add': function() {
			React.renderComponent(<AddGameForm onGameFormSubmitted={handleAddFormSubmitted}/>,
						document.getElementById('app'));
		}
	});

	function handleAddFormSubmitted(data) {
		console.dir(data);
	}

	function getRefs(component) {
		var result = {};
		Object.keys(component.refs).forEach(function(refName){
			result[refName] = component.refs[refName].getDOMNode().value;
		});
		return result;
	}

})();