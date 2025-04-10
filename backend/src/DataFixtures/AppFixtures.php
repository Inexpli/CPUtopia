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
        $category->setName('GPU');

        $manager->persist($category);

        $product = new Product();
        $product->setCategory($category); 
        $product->setName('Product two');
        $product->setDescription('Description');
        $product->setPrice('30.99'); 
        $product->setStock(5);

        $manager->persist($product);

        $product = new Product();
        $product->setCategory($category); 
        $product->setName('Product two');
        $product->setDescription('Description');
        $product->setPrice('36.99'); 
        $product->setStock(3);

        $manager->persist($product);

        $manager->flush();
    }
}
