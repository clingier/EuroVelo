import React from 'react';
import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import App from './App';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
        this._cacheResourcesAsync.bind(this);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={async () => {
                        const databases = await this._cacheResourcesAsync()
                        const traces_db = databases[0];
                        const organisation_db = databases[1];
                        this.setState({trace_db: traces_db});
                        this.setState({organisation_db: organisation_db});
                    }}
                    onFinish={() => {
                        this.setState({isReady: true});
                    }}
                    onError={console.warn}
                />
            );
        }
        return (
            <App trace_db={this.state.trace_db} organisation_db={this.state.organisation_db}/>
        );
    }

    async _cacheResourcesAsync() {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./src/assets/traces_db.db")).uri,
            FileSystem.documentDirectory + 'SQLite/traces_db.db'
        );
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./src/assets/organisation_db.db")).uri,
            FileSystem.documentDirectory + 'SQLite/organisation_db.db'
        );
        return [SQLite.openDatabase('traces_db.db'), SQLite.openDatabase('organisation_db.db')];
    }
}
