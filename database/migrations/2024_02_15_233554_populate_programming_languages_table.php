<?php

use App\Models\ProgrammingLanguage;
use GuzzleHttp\Client;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $client = new Client();

        $where = urlencode('{
            "ProgrammingLanguage": {
                "$exists": true
            }
        }');

        $response = $client->get('https://parseapi.back4app.com/classes/ProgrammingLanguages_All_Programming_Languages?limit=705&keys=ProgrammingLanguage&where=' . $where, [
            'headers' => [
                'X-Parse-Application-Id' => 'sSNgK4WyuwVEit3Mttxwb1JuxP2bWCyP9uNvwytv', // This is your app's application id
                'X-Parse-REST-API-Key' =>  'x3nSyuEqBu6UhGxTsd5TjyVskcOBiO6MUzAxOzzW'
            ]
            ]);

            foreach (json_decode($response->getBody()->getContents(), true)['results'] as $result_language) {
                $language = new ProgrammingLanguage();
                $language->name = $result_language['ProgrammingLanguage'];
                $language->save();
            }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
