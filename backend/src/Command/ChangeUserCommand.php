<?php

namespace App\Command;

use App\Entity\User;
use App\Service\User\Auth;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ChangeUserCommand extends Command
{
    protected static $defaultName = 'app:change-user';
    protected static $defaultDescription = 'Changes user password';

    /**
     * @var Auth
     */
    private $auth;

    public function __construct(Auth $auth)
    {
        parent::__construct();

        $this->auth = $auth;
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $user = $io->ask('Type username', null, function ($login)
        {
            $user = $this->auth->getUserByLogin($login);
            if (!$user instanceof User)
                throw new \RuntimeException('User not found');

            return $user;
        });

        $password = $io->ask('Type new password', null, function ($password)
        {
            if (empty($password))
                throw new \RuntimeException('Password could not be empty');

            return $password;
        });

        $password_changed = $this->auth->setUserPassword($user, $password);

        if ($password_changed)
        {
            $io->writeln("Changed user {$user->getUsername()} password:");
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
