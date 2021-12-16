import { renderGame, renderTeam } from '../render-utils.js';
const test = QUnit.test;

test('renderGame returns elements: div > p, p </ div, div > p, p < /div with text content corresponding to the object argument passed, and added classLists', (expect) => {
    const game = {
        name1: 'name1',
        name2: 'name2',
        score1: 'score1',
        score2: 'score2'
    };

    const expected = '<div class="team"><p class="name">name1</p><p class="score">score1</p></div><div class="team"><p class="name">name2</p><p class="score">score2</p></div>';
    
    const actual = renderGame(game);

    expect.equal(actual.innerHTML, expected, 'this test proves the function returns the correct elements with the correct text content and added classLists');
});

test('renderTeam takes in 2 arguments and returns html elements with corresponding text content and added classLists', (expect) => {

    const game = {
        name1: 'name1',
        name2: 'name2',
        score1: 'score1',
        score2: 'score2'
    };

    const expected = '<p class="name">name1</p><p class="score">score1</p>';
    
    const actual = renderTeam(game.name1, game.score1);

    expect.equal(actual.innerHTML, expected, 'this test proves the function returns the correct elements with the correct text content and added classLists');
});