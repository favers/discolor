import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Button } from 'react-native';

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameList: [
                [false]
            ],
            gameLv: 1
        };
    }

    handleChange(pos) {
        let {gameList} = this.state;
        let x = +pos[0];
        let y = +pos[1];

        if (gameList[x - 1] !== undefined) {
            if (gameList[x - 1][y] !== undefined) {
                gameList[x - 1][y] = !gameList[x - 1][y];
            }
        }
        if (gameList[x + 1] !== undefined) {
            if (gameList[x + 1][y] !== undefined) {
                gameList[x + 1][y] = !gameList[x + 1][y];
            }
        }
        if (gameList[x] !== undefined) {
            if (gameList[x][y - 1] !== undefined) {
                gameList[x][y - 1] = !gameList[x][y - 1];
            }
        }
        if (gameList[x] !== undefined) {
            if (gameList[x][y + 1] !== undefined) {
                gameList[x][y + 1] = !gameList[x][y + 1];
            }
        }
        gameList[x][y] = !gameList[x][y];

        this.setState({ gameList });
        this.gameWin();
    }

    gameWin() {
        let {gameLv, gameList} = this.state;

        for (let n = 0; n < gameList.length; n++) {
            for (let m = 0; m < gameList[n].length; m++) {
                if (!gameList[n][m]) {
                    return false;
                }
            }
        }
        gameLv++;
        let newGameList = [];
        for (let k = 0; k < gameLv; k++) {
            newGameList[k] = [];
            for (let h = 0; h < gameLv; h++) {
                newGameList[k][h] = false;
            }
        }
        this.setState({
            gameList: newGameList,
            gameLv
        });
        alert('你赢了,下一关');
    }

    handleReset() {
        let {gameLv, gameList} = this.state;
        gameLv = 1;
        gameList = [
            [false]
        ];
        this.setState({ gameLv, gameList })
    }


    render() {
        let {gameList, gameLv} = this.state;
        console.log(gameLv);
        return (
            <View style={styles.container}>
                <View style={styles.gameWrap}>
                    {
                        gameList.map((item, index) => {
                            return (
                                <View style={styles.gameRowWrap} key={index}>
                                    {
                                        item.map((list, idx) => {
                                            return (
                                                <TouchableHighlight
                                                    style={list ? styles.gameBlockSelected : styles.gameBlockDefault}
                                                    key={idx}
                                                    onPress={this.handleChange.bind(this, [index, idx])}
                                                    >
                                                    <View ref="block" style={list ? styles.gameBlockSelected : styles.gameBlockDefault}></View>
                                                </TouchableHighlight>
                                            );
                                        })
                                    }
                                </View>
                            );
                        })
                    }
                </View>
                <View style={styles.gameFooter}>
                    <Text>当前为第{gameLv}关</Text>
                    <Button
                        onPress={this.handleReset.bind(this)}
                        title="重新开始"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    gameWrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        padding: 30
    },
    gameRowWrap: {
        flex: 1,
        flexDirection: 'row'
    },
    gameBlockDefault: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#e6ab5e'
    },
    gameBlockSelected: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#5c90ff'
    },
    gameFooter: {
        marginTop: 30
    }
});