<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="EVE Online - Are You Real Mens?">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <style>
        body {
            padding-top: 50px;
            padding-bottom: 20px;
        }
    </style>
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
</head>
<body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Real Mens</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class='visible-lg'><a>Tools:</a></li>
            <li> <a href="/#kill">Killmail</a> </li>
            <li> <a href="/#battle">Battle Report</a> </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class='visible-lg'><a>Links:</a></li>
            <li> <a href="https://discord.gg/CUSbtq9">Discord</a> </li>
            <li> <a href="https://PayPal.Me/tehraven">Donate</a> </li>
          </ul>         
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <div class="container">
            <h1>Real Mens Checker</h1>
            <p>Enter a zkillboard.com Kill URL to see if the attackers were Real Mens.</p>
            <form id='form_verify_zkillurl' role="form">
                <div class="input-group" style='max-width: 700px;'>
                    <input type="text" id='input_verify_zkillurl' class="form-control" placeholder="zkill url...">
                    <span class="input-group-btn">
                        <button id='btn_verify_zkillurl' class="btn btn-default" type="button">Verify!</button>
                    </span>
                </div>
            </form>
        </div>
        
        <br /><br /><br />
        
        <div id="div_zkill_lostship" class="container hidden">
            <div class="panel panel-default">
                <div class="panel-heading">Menly Meter</div>
                <div id="div_zkill_lostship_meter" class="panel-body well-sm text-center"></div>
            </div>
            <div class="row text-center">
                <div class="col-sm-12 col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">The Kill</div>
                        <div class="panel-body well-sm">
                            <div id="div_zkill_lostship_a">
                                <img src="..." alt="...">
                                <div class="caption">
                                    <h3>Thumbnail label</h3>
                                    <p>...</p>
                                    <p><a href="#" target="_blank" class="btn btn-primary" role="button">Button</a> 
                                    <a href="#" target="_blank" class="btn btn-default" role="button">Button</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">The Victim</div>
                        <div class="panel-body well-sm">
                            <div id="div_zkill_lostship_b">
                                <img src="..." alt="...">
                                <div class="caption">
                                    <h3>Thumbnail label</h3>
                                    <p>...</p>
                                    <p><a href="#" target="_blank" class="btn btn-primary" role="button">Button</a> 
                                    <a href="#" target="_blank" class="btn btn-default" role="button">Button</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">The Mens</div>
                        <div class="panel-body well-sm">
                            <div id="div_zkill_lostship_c">
                                <img src="..." alt="...">
                                <div class="caption">
                                    <h3>Thumbnail label</h3>
                                    <p>...</p>
                                    <p><a href="#" target="_blank" class="btn btn-primary" role="button">Button</a> 
                                    <a href="#" target="_blank" class="btn btn-default" role="button">Button</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <br /><br /><br />
    
        <div id="div_zkill_attackers" class="container hidden">
            
            <div class="panel panel-primary">
                <div class="panel-heading">Real Mens</div>
                <div class="panel-body well-sm">
                    <div id='div_zkill_attackers_mens' class='row'></div>
                </div>
            </div>
            
            <div class="panel panel-danger">
                <div class="panel-heading">Not Mens</div>
                <div class="panel-body well-sm">
                    <div id='div_zkill_attackers_notmens' class='row'></div>
                </div>
            </div>
            
        </div>
        
        <br /><br /><br /><br /><br />
    
        <div id="div_confused" class="container">
            <h2>Story Time</h2>
            <p>TEST had a blue entity named ICARUS. ICARUS shot TEST, and were effectively reset.</p>
            <p>During these efforts to burn them, diplomacy was attempted. Here are a few snippets from that conversation:</p>
          <!-- Example row of columns -->
          <div class="row">
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/96490278_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Fight Like Mens!</h4>
                    [ 2018.01.16 15:59:48 ]<br />
                    Provagus Great > yea, your alliance don't fight like mens<br />
                    Provagus Great > and it's really sad<br />
                    ﻿Provagus Great > you keep 20 afk'ers in our sov
                </div>
            </div>
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/2076856940_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Coalition of Real Mens</h4>
                    [ 2018.01.16 16:08:55 ]<br />
                    Dran Arcana > but there are ways to fight cloaky campers<br />
                    ﻿Dran Arcana > have you tried standing fleets?<br />
                    ﻿Dran Arcana > or joining a coalition of real mens?<br />
                </div>
            </div>
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/2076856940_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Commutative Law of EVE</h4>
                    [ 2018.01.16 16:13:04 ]<br />
                    ﻿Dran Arcana > Did you know that, mathematically, the distance between a point (A), and a second point (B), is the same as the distance between (B) and (A)<br />
                    ﻿Dran Arcana > I believe this is called the Commutative law<br />
                    ﻿Provagus Great > do you know that you can measure distance in many ways?<br />
                    Dran Arcana > I use a ruler typically
                </div>
            </div>
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/96490278_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Don't Forget The Trees</h4>
                    ﻿[ 2018.01.16 16:14:12 ]<br />
                    Provagus Great > imagine garden<br />
                    Provagus Great > there is boy and girl 5m from each other<br />
                    Dran Arcana > ok, I'm imagining a garden<br />
                    ﻿Dran Arcana > it has roses, and tomato plants<br />
                    ﻿Provagus Great > ok nice<br />
                    ﻿Provagus Great > what distance between them?<br />
                    ﻿Dran Arcana > 5m<br />
                    ﻿Provagus Great > don't forget about trees<br />
                    ﻿Provagus Great > now imagine that boy is in room A<br />
                    ﻿Provagus Great > and girl is in room B<br />
                    ﻿Provagus Great > between them is wall<br />
                    ﻿Dran Arcana > wait where is the room, I thought we were in a tomato garden?<br />
                    ﻿Provagus Great > next to garden is house<br />
                    ﻿Provagus Great > you imagined wrong garden<br />
                    ﻿Dran Arcana > oh ok my bad<br />
                    ﻿Dran Arcana > I'm imagining a house now<br />
                    ﻿Provagus Great > so between boy and girl is wall<br />
                    ﻿Dran Arcana > how thick is the wall?<br />
                    ﻿Provagus Great > still 5m to each other<br />
                    ﻿Provagus Great > but to move boy to girl you must do more than that 5m<br />
                    ﻿Provagus Great > becouse he can't move through wall<br />
                    ﻿Dran Arcana > is it a load bearing wall?<br />
                    ﻿Provagus Great > ok, nvm come back to my problem<br />
                </div>
            </div>
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/2076856940_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Not Winning</h4>
                    ﻿[ 2018.01.16 16:31:02 ]<br />
                    Dran Arcana > so winning makes us not mens?<br />
                    Provagus Great > it's not winning<br />
                    Dran Arcana > it sure sounds like we're winning
                </div>
            </div>
            <div class="media col-sm-12">
                <div class="media-left">
                    <a href="#"><img alt="64x64" class="media-object" data-src="" src="https://image.eveonline.com/Character/96490278_64.jpg" style="width: 64px; height: 64px;"></a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">Not Winning</h4>
                    ﻿[ 2018.01.16 16:36:27 ]<br />
                    Provagus Great > this part of space is really nice<br />
                    ﻿Provagus Great > it's big pocket in null space<br />
                    ﻿Provagus Great > my corp is too weak and poor to rent systems<br />
                    Dran Arcana > I'm sorry to hear that<br />
                </div>
            </div>
            
          </div>
          <br /><br />
          <p>Those with TEST Alliance forum access can <a href='https://forum.pleaseignore.com/topic/98247-icarus-wants-to-be-blue-again/' target='_blank'>read the thread</a>.</p>
        </div> <!-- /container -->

      <hr>

      <footer class='container'>
        <p>Shit code created by RaveNight.</p>
        <small>Running on NGINX with absolutely no backend code nor databases.</small><br />
        <small>This web app runs entirely from your computer. Your browser/internet are used to query API's on the web.</small><br />
        <small>Static data from EVE Online (Ship Types, Characters) are stored on your local computer (localStorage). This makes subsequent requests unnecessary.</small>
      </footer>
        
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="js/vendor/bootstrap.min.js"></script>
    <script src="js/func.js"></script>
    <script src="js/app.js"></script>
    <script src="js/main.js"></script>
    
</body>
</html>
