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