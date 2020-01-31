import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Titlebar from './Titlebar';

function ExtensionDownload() {
    const extensions = [{
        name: 'opera',
        title: 'Opera',
        link: ''
    }, {
        name: 'chrome',
        title: 'Google Chrome',
        link: ''
    }, {
        name: 'firefox',
        title: 'Firefox',
        link: ''
    }];

    return (
        <div>
            <Titlebar title="Browser Extensions" />
            <p>Browser extensions allow you to extract colors from Adobe color page. You can download the extension for your browser of choice.</p>
            {extensions.map(e => <DownloadItem key={e.name} extension={e} />)}
        </div>
    );
}

class DownloadItem extends Component {
    static propTypes = {
        extension: PropTypes.object.isRequired
    }

    render() {
        const { name, title, link } = this.props.extension;
        const logo = `https://raw.githubusercontent.com/alrra/browser-logos/master/src/${name}/${name}_64x64.png`;
        return (
            <div className="mb-2">
                <Link to={link}>
                    <img className="zoom mr-2" src={logo} alt={name} />{title}
                </Link>
            </div>
        );
    }
}


export default ExtensionDownload;