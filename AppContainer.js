import React from 'react';
import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import App from './App';

function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

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
                        await this._loadImagesAsync()
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


    async _loadImagesAsync() {
        const imageAssets = cacheImages([
          require('./src/assets/images/eurovelo1.jpg'),
          require('./src/assets/images/eurovelo2.jpg'),
          require('./src/assets/images/eurovelo3.jpg'),
          require('./src/assets/images/eurovelo4.jpg'),
          require('./src/assets/images/eurovelo5.jpg'),
          require('./src/assets/images/eurovelo6.jpg'),
          require('./src/assets/images/eurovelo7.jpg'),
          require('./src/assets/images/eurovelo8.jpg'),
          require('./src/assets/images/eurovelo9.jpg'),
          require('./src/assets/images/eurovelo10.jpg'),
          require('./src/assets/images/eurovelo11.jpg'),
          require('./src/assets/images/eurovelo12.jpg'),
          require('./src/assets/images/eurovelo13.jpg'),
          require('./src/assets/images/eurovelo14.jpg'),
          require('./src/assets/images/eurovelo15.jpg'),
          require('./src/assets/images/eurovelo16.jpg'),
          require('./src/assets/images/eurovelo17.jpg'),
        ]);
        
        await Promise.all([...imageAssets]);
    }
    

    async _cacheResourcesAsync() {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./src/assets/traces_db.db")).uri,
            FileSystem.documentDirectory + 'SQLite/traces_db.db'
        );
        if(!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/organisation_db.db')).exists)
        {
            await FileSystem.downloadAsync(
                Asset.fromModule(require("./src/assets/organisation_db.db")).uri,
                FileSystem.documentDirectory + 'SQLite/organisation_db.db'
            );
        }
        return [SQLite.openDatabase('traces_db.db')];
    }
}
