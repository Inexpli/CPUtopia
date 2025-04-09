<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use App\Entity\Category;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $category = new Category();
        $category->setName('Electronics');

        $manager->persist($category);

        $product = new Product();
        $product->setCategory($category); 
        $product->setName('Product one');
        $product->setDescription('Description');
        $product->setPrice('10.15'); 
        $product->setStock(10);

        $manager->persist($product);

        $manager->flush();
    }
}
