<?php

namespace App\Helpers;

class PasswordGenerator
{

    /**
     * https://stackoverflow.com/questions/6101956/generating-a-random-password-in-php/31284266#31284266
     *
     * @param int $length
     * @return string
     * @throws \Exception
     */
    static function generate(int $length): string
    {
        $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-:;';
        $str = '';
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $str .= $keyspace[random_int(0, $max)];
        }
        return $str;
    }
}