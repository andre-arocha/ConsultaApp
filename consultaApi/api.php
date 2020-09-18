<?php

include_once('conexao.php');
 $postjson =  json_decode(file_get_contents('php://input'),true);

 if($postjson['requisicao'] == 'login'){
    $query = $pdo->query("SELECT * from usuarios where usuario = '$postjson[usuario]' and senha = '$postjson[senha]'");
    $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
    for ($i=0; $i < count($resultado); $i++){
        foreach ($resultado[$i] as $key => $value) {
        }
            $dados = array(
                'id'=> $resultado[$i]['id'],
                'nome'=> $resultado[$i]['nome'],
                'cpf' => $resultado[$i]['cpf'],
                'telefone' => $resultado[$i]['telefone'],
                'cep' => $resultado[$i]['cep'],
                'endereco' => $resultado[$i]['endereco'],
                'numero' => $resultado[$i]['numero'],
                'complemento' => $resultado[$i]['complemento'],
                'bairro' => $resultado[$i]['bairro'],
                'cidade' => $resultado[$i]['cidade'],
                'usuario'=> $resultado[$i]['usuario'],
                'senha'=> $resultado[$i]['senha'],
                'nivel'=> $resultado[$i]['nivel'],
            );
        }
    
    if(count($resultado)>0){
        $resultado_para = json_encode(array('success'=>true,'result'=>$dados));
    }
    else {
        $resultado_para = json_encode(array('success'=>false, 'msg'=>'Usuário não cadastrado'));
    }
    echo $resultado_para;
}
else if($postjson['requisicao'] == 'add'){
    $query = $pdo->prepare("INSERT INTO usuarios SET nome=:nome, cpf=:cpf, telefone=:telefone,
    cep=:cep, endereco=:endereco, numero=:numero, complemento=:complemento, bairro=:bairro, 
    cidade=:cidade, usuario=:usuario, senha=:senha, nivel=:nivel ");
    $query->bindValue(':nome',        $postjson['nome']);
    $query->bindValue(':cpf',         $postjson['cpf']);
    $query->bindValue(':telefone',    $postjson['telefone']);
    $query->bindValue(':cep',         $postjson['cep']);
    $query->bindValue(':endereco',    $postjson['endereco']);
    $query->bindValue(':numero',      $postjson['numero']);
    $query->bindValue(':complemento', $postjson['complemento']);
    $query->bindValue(':bairro',      $postjson['bairro']);
    $query->bindValue(':cidade',      $postjson['cidade']);
    $query->bindValue(':usuario',       $postjson['usuario']);
    $query->bindValue(':senha',       $postjson['senha']);
    $query->bindValue(':nivel',      $postjson['nivel']);
    $query->execute();

    $id = $pdo->lastInsertId();

    if($query){
        $res = json_encode(array('success'=>true,'id'=>$id));
    }else{
        $res = json_encode(array('success'=>false));
    }
    echo $res;

}

// else if($postjson['requisicao']=='editar'){
//     $query = $pdo->prepare("UPDATE usuarios SET nome=:nome, cpf=:cpf, telefone=:telefone, cep:cep, endereco=:endereco, numero=:numero, complemento=:complemento, bairro=:bairro, cidade=:cidade, email=:email, senha=:senha WHERE id=:id");
//     $query->bindValue(':nome', $postjson['nome']);
//     $query->bindValue(':cpf', $postjson['cpf']);
//     $query->bindValue(':telefone', md5($postjson['telefone']));
//     $query->bindValue(':cep', $postjson['cep']);
//     $query->bindValue(':endereco', $postjson['endereco']);
//     $query->bindValue(':numero', $postjson['numero']);
//     $query->bindValue(':complemento', $postjson['complemento']);
//     $query->bindValue(':bairro', md5($postjson['bairro']));
//     $query->bindValue(':cidade', $postjson['cidade']);
//     $query->bindValue(':email', $postjson['email']);
//     $query->bindValue(':senha', $postjson['senha']);
//     $query->bindValue(':id', $postjson['id']);
//     $query->execute();

//     if($query){
//         $result = json_encode(array('success' => true));
//     }else{
//         $result = json_encode(array('success' => false, 'result' => 0));
//     }

//     echo $result;

// }// Final do método editar

// else if($postjson['requisicao']=='excluir'){
//     $query = $pdo->query("DELETE FROM usuarios where id = '$postjson[id]'");
//     if($query){
//         $result = json_encode(array('success'=>true));
//     }else{
//         $result = json_encode(array('success'=>false));
//     }
//     echo $result;

    
// }// Final do método excluir


?>