const element = React.createElement;
var elem = document.createElement('h1');
elem.setAttribute('id', 'h1');
elem.setAttribute('value', 'Hi Mane!');

function getColor() {
    let arr = ['red', 'black', 'grey', 'green', 'blue', 'orange'];
    let size = arr.length;
    if (i >= size) {
        i = 0;
    }
    return arr[i++];
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            elem.setAttribute('style', getColor());
            return elem;
        }
    
        return element('button',
            { onClick: () => this.setState({ liked: true }) },
            'Like');
    }
}

const container = document.querySelector('#main');
ReactDOM.render(element(Button), container);