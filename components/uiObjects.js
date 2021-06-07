const gamePlayUI = `
<div class="row d-flex align-items-center justify-content-center">
            <div class="col-4">
              <div class="card bg-default">
                <div class="card-header">
                  <div class="player-icon"><img src="img/char/monkey.png" alt="monkey face emoji"  aria-hidden="true"><h3 class="sr-only">Player</h3></div>
                </div>
                <div class="card-body score-area">
                  <div class="scorecard-body" id="user-score">0</div>
                </div>
                <div class="card-footer">
                  <div class="aggregates">
                    <div></div>
                    <div><img src="img/rock.png"><span id="userRockCount">0</span></div>
                    <div><img src="img/paper.png"><span id="userPaperCount">0</span></div>
                    <div><img src="img/scissors.png"><span id="userScissorsCount">0</span></div>
                    <div></div>
                  </div>
                </div> 
              </div>
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center">
                  <h2 class="huge"> &#127386; </h2>
            </div>
            <div class="col-4">
              <div class="card bg-default">
                <div class="card-header">
                  <div class="player-icon"><img src="img/robot.png" alt="robot face emoji"  aria-hidden="true"><h3 class="sr-only">Computer</h3></div>
                </div>
                <div class="card-body score-area">
                  <div class="scorecard-body" id="comp-score">0</div>
                </div>
                <div class="card-footer">
                  <div class="aggregates">
                    <div></div>
                    <div><img src="img/rock.png"><span id="compRockCount">0</span></div>
                    <div><img src="img/paper.png"><span id="compPaperCount">0</span></div>
                    <div><img class="flip-horizontal" src="img/scissors.png"><span id="compScissorsCount">0</span></div>
                    <div></div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <h5 class="card-header">
                  <span id="round-number">Round: 1</span>
                </h5>
                <div class="card-body" id="play-input">
                  <p class="card-text">
                    Shoot!
                  </p>
                  <div class="play-buttons">
                    <button type="button" id='rockSubmit' class="btn btn-outline-primary btn-lg">
                      <img src="img/rock.png">
                    </button>
                    <button type="button" id='paperSubmit' class="btn btn-outline-primary btn-lg">
                      <img src="img/paper.png">
                    </button>
                    <button type="button" id='scissorsSubmit' class="btn btn-outline-primary btn-lg">
                      <img src="img/scissors.png">
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div id="game-history"">
            </div>
          </div>
          </div>
`;

const historyCols = 
`   <div class="col"></div>   
    <div class="col"></div>
    <div class="col"></div>
    <div class="col user-disk"></div>
    <div class="col user-play"></div>
    <div class="col history-round text-muted"></div>
    <div class="col comp-play"></div>
    <div class="col comp-disk"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>`

export { gamePlayUI, historyCols }