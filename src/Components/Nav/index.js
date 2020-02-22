import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavData from '../../Data/Nav.json';
import './Nav.css';

//Component to handle the menu and the application navigation
class Nav extends Component {

    constructor(props) {
        super(props)
        //Extract the Data from the data Nav JSON
        this.state = NavData;
        this.menuHeight = 10; //defauult menu height

        //Bind function to allow calls
        this.stickyNav = this.stickyNav.bind(this);
        this.setMenuTopValue = this.setMenuTopValue.bind(this);

        //Create references to read and modify DOM elements
        this.navbar = React.createRef();
        this.navbarCollapse = React.createRef();
    }

    componentDidMount() {
        //on first loading calculate menu top value, add listeners to handle scrolling, and prepare for mobile navigation
        this.setMenuTopValue();
        window.addEventListener('scroll', this.stickyNav);
        window.addEventListener('resize', this.setMenuTopValue);
        this.defaultScroll();
    }

    componentDidUpdate(prevProps) {
        if(this.props.hash !== prevProps.hash) this.defaultScroll();
    }

    componentWillUnmount(){
        //Cleanup listeners when components unmount
        window.removeEventListener('scroll', this.stickyNav);
        window.removeEventListener('resize', this.setMenuTopValue);
    }

    defaultScroll(){
        //On mount and update if the hash changed, check if hash is not undefined and scroll into it
        if(typeof this.props.hash !== 'undefined') this.scrollIntoByClass(this.props.hash.substr(1));
    }

    scrollIntoByClass(classe){
        //Use the section class to scroll into it, checks if it exists first
        const target = document.getElementsByClassName(classe)[0];
        if(typeof target !== 'undefined') target.scrollIntoView({behavior: 'smooth'});
    }

    toggleMenuPhone(){
        //toggle class to collapse items on mobile navigations
        this.navbarCollapse.current.classList.toggle('mob-collapse')
    }

    setMenuTopValue(){
        //calculate top margin space to allow menu sticking or free positioning
        if(window.innerWidth < 786) this.menuHeight = 80;
        const navAnchor = document.getElementById('navAnchor');
        this.menuTopValue = navAnchor.offsetTop + this.menuHeight;
        this.stickyNav();
    }

    stickyNav(){
        //toggles between sticked menu or free positioning
        if(window.pageYOffset > this.menuTopValue) {   
            if(!this.navbar.current.classList.contains('fixed'))
                this.navbar.current.classList.add('fixed');
        }else{  
            if(this.navbar.current.classList.contains('fixed'))
                this.navbar.current.classList.remove('fixed');
        } 

        this.checkActiveSection()
    }

    checkActiveSection(){
        //Find closest section to scroll segment
        const sections = this.navbarCollapse.current.children;
        let activableItem = sections[0];

        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementsByClassName(sections[i].firstChild.hash.substr(1))[0]
            if(section.getBoundingClientRect().top > (window.innerHeight/2)){
                break
            }
            activableItem = sections[i];
        } 
        this.setActiveSection(activableItem)
    }

    setActiveSection(item){
        //adds the class "active" to the current showing section
        let sections = this.navbarCollapse.current.children;

        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active')
        }

        if(item !== undefined)
            item.classList.add('active');
    }

    renderSections(){
        //renders the sections extracted from the nav data json
        return this.state.sections.map( (section) => {
            const href = '#' + section;
            return <li className="" key={section}><Link to={href}>{section}</Link></li>;
        });
    }

    render(){
        const toggle = this.state.toggle;

        return (
            <nav className="navbar navbar-default" id="navbar-example" role="navigation" ref={this.navbar}>
                <header className="navbar-header">
                    <button type="button" className="navbar-toggle" onClick={() => this.toggleMenuPhone()}>
                        <span className="sr-only">{toggle}</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </header>

                <ul className="mob-collapse navbar-collapse navbar-ex1-collapse nav navbar-nav mob-collapse" ref={this.navbarCollapse}>
                    { this.renderSections() }
                </ul>
            </nav>
        )
    }
}

export default Nav;