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
          <a class="navbar-brand" href="#">Real Mens (in Space)</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" role="form">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Real Mens Checker</h1>
        <p>Enter a zkillboard.com Kill URL to see if the attackers were Real Mens.</p>
        <form role="form">
            <div class="input-group">
                <input type="text" id='input_verify_zkillurl' class="form-control" placeholder="zkill url...">
                <span class="input-group-btn">
                    <button id='btn_verify_zkillurl' class="btn btn-default" type="button">Verify!</button>
                </span>
            </div>
        </form>
        <p><?php
        error_reporting(E_ALL);
        ini_set("display_errors", "1");
        
        require_once(__DIR__ . '/eve-esi-master/autoload.php');
        
        $api_instance = new Swagger\Client\Api\AllianceApi();
        $datasource = "tranquility"; // string | The server name you would like data from
        $user_agent = "realmens.space"; // string | Client identifier, takes precedence over headers
        $x_user_agent = "realmens.space"; // string | Client identifier, takes precedence over User-Agent

        // try {
            // $result = $api_instance->getalliances($datasource, $user_agent, $x_user_agent);
            // print_r($result);
        // } catch (exception $e) {
            // echo 'exception when calling allianceapi->getalliances: ', $e->getmessage(), php_eol;
        // }

        ?></p>
        <h2>Confused?</h2>
        <p>TEST had a blue entity named ICARUS.</p>
        <p>ICARUS shot TEST, and were effectively reset.</p>
        <p>TEST Predditors group decided to entosis and burn them to the ground.</p>
        <p>During these efforts, diplomacy was attempted from ICARUS. Here are a few snippets from that conversation:</p>
        <blockquote>
        ﻿[ 2018.01.16 15:59:48 ]<br />
        Provagus Great > yea, your alliance don't fight like mens<br />
        Provagus Great > and it's really sad<br />
        ﻿Provagus Great > you keep 20 afk'ers in our sov
        </blockquote>
        <p>...</p>
        <blockquote>
        ﻿[ 2018.01.16 16:13:04 ]<br />
        ﻿Dran Arcana > Did you know that, mathematically, the distance between a point (A), and a second point (B), is the same as the distance between (B) and (A)<br />
        ﻿Dran Arcana > I believe this is called the Commutative law<br />
        ﻿Provagus Great > do you know that you can measure distance in many ways?<br />
        Dran Arcana > I use a ruler typically
        </blockquote>
        <p>...</p>
        <blockquote>
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
        </blockquote>
        <p>...</p>
        <blockquote>
        [ 2018.01.16 16:08:55 ]<br />
        Dran Arcana > but there are ways to fight cloaky campers<br />
        ﻿Dran Arcana > have you tried standing fleets?<br />
        ﻿Dran Arcana > or joining a coalition of real mens?<br />
        </blockquote>
        <p>Those with TEST Alliance forum access can <a href='https://forum.pleaseignore.com/topic/98247-icarus-wants-to-be-blue-again/' target='_blank'>read the thread</a>.</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
       </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
      </div>

      <hr>

      <footer>
        <p>&copy; Company 2015</p>
      </footer>
    </div> <!-- /container -->
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>

        <script src="js/main.js"></script>
    </body>
</html>
