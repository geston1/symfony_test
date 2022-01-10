<?php

namespace App\Command;

use App\Helpers\PasswordGenerator;
use App\Service\User\Auth;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * test
 * @a!*;7WJ0l6OjkX
 */

class CreateUserCommand extends Command
{
    /**
     * @var Auth
     */
    private $auth;

    protected static $defaultName = 'app:create-user';
    protected static $defaultDescription = 'Creates user';

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;

        parent::__construct();
    }

    protected function configure(): void
    {

    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $login = $io->ask('Type username');
        $password_length = $io->ask('Type password length', 15, function ($value){
            if (!is_numeric($value)) {
                throw new \RuntimeException('Expected numeric value');
            }
            return (int) $value;
        });

        $password = PasswordGenerator::generate($password_length);
        $user_created = $this->auth->register($login, $password);

        if ($user_created)
        {
            $io->writeln("Created user $login with password:");
            $io->success($password);
            return Command::SUCCESS;
        }
        else
        {
            $io->error("Internal Error!");
            return Command::FAILURE;
        }
    }
}
